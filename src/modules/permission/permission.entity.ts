import {
	Entity,
	ObjectIdColumn,
	Column,
	Index,
	CreateDateColumn,
	UpdateDateColumn,
	BeforeInsert,
	BeforeUpdate
} from 'typeorm'
import { IsString, IsNotEmpty } from 'class-validator'
import uuid = require('uuid')

@Entity()
export class Permission {
	@ObjectIdColumn()
	_id: string

	@Column()
	@IsString()
	@IsNotEmpty()
	code: string

	@Column()
	@IsString()
	description: string

	@CreateDateColumn()
	createdAt: string
	@UpdateDateColumn()
	updatedAt: string

	@BeforeInsert()
	async b4create() {
		this._id = await uuid.v1()
	}

	@BeforeUpdate()
	async b4update() {
		console.log('b4Permission')
		// this.password = await bcrypt.hash(this.password, 10)
	}
}
