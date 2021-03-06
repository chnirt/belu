import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UserPermission } from './userPermission.entity'
import { MongoRepository } from 'typeorm'
import {
	CreateUserPermissionInput,
	UpdateUserPermissionInput
} from '../../graphql'
import { ApolloError } from 'apollo-server-core'

@Injectable()
export class UserPermissionService {
	constructor(
		@InjectRepository(UserPermission)
		private readonly userPermissionRepository: MongoRepository<UserPermission>
	) {}

	async findAll(): Promise<UserPermission[]> {
		return await this.userPermissionRepository.find({
			cache: true
		})
	}

	async findOneByUserId(_id: string): Promise<UserPermission> {
		const message = 'UserPermission is not found.'

		const userPermission = await this.userPermissionRepository.findOne({
			userId: _id
		})

		if (!userPermission) {
			throw new Error(message)
		}

		return userPermission
	}

	async findAllByUserId(userId: string): Promise<UserPermission[]> {
		const message = 'UserPermission is not found.'

		const userPermission = await this.userPermissionRepository.find({
			userId
		})

		if (!userPermission) {
			throw new Error(message)
		}

		return userPermission
	}

	async findOne(conditions: any): Promise<UserPermission> {
		const message = 'Unauthorized'
		const code = '401'
		const additionalProperties = {}

		const userPermission = await this.userPermissionRepository.findOne(
			conditions
		)

		if (!userPermission) {
			throw new ApolloError(message, code, additionalProperties)
		}

		return userPermission
	}

	async create(input: CreateUserPermissionInput): Promise<UserPermission> {
		const { userId, siteId, permissions } = input

		const existedUserPermission = await this.userPermissionRepository.findOne({
			userId,
			siteId
		})

		if (existedUserPermission) {
			existedUserPermission.permissions = permissions

			return await this.userPermissionRepository.save(existedUserPermission)
		} else {
			const userPermission = new UserPermission()
			userPermission.userId = userId
			userPermission.siteId = siteId
			userPermission.permissions = permissions

			return await this.userPermissionRepository.save(userPermission)
		}
	}

	async update(_id: string, input: UpdateUserPermissionInput): Promise<boolean> {
		const message = 'UserPermission is not found.'
		const { permissions } = input

		const userPermission = await this.userPermissionRepository.findOne({ _id })

		if (!userPermission) {
			throw new Error(message)
		}

		userPermission.permissions = permissions

		return (await this.userPermissionRepository.save(userPermission))
			? true
			: false
	}

	async delete(_id: string): Promise<boolean> {
		const message = 'UserPermission is not found.'

		const userPermission = await this.userPermissionRepository.findOne({ _id })

		if (!userPermission) {
			throw new Error(message)
		}

		return (await this.userPermissionRepository.remove(userPermission))
			? true
			: false
	}

	async deleteAll(): Promise<boolean> {
		return (await this.userPermissionRepository.deleteMany({})) ? true : false
	}
}
