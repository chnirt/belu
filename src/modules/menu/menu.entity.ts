import {
	Entity,
	ObjectIdColumn,
	Column,
	CreateDateColumn,
	BeforeInsert,
	UpdateDateColumn
} from 'typeorm'
import { v1 as uuidv1 } from 'uuid'
import { DishInfo } from '../../graphql'

@Entity()
export class Menu {
	@ObjectIdColumn()
	_id: string

	@Column()
	name: string

	@Column()
	siteId: string

	@Column()
	shopId: string

	@Column()
	dishes: [DishInfo] | []

	@Column()
	isPublished: boolean

	@Column()
	isLocked: boolean

	@Column()
	isActive: boolean

	@CreateDateColumn()
	createAt: string

	@UpdateDateColumn()
	updateAt: string

	@BeforeInsert()
	async b4create() {
		this._id = await uuidv1()
		this.dishes = []
		this.isPublished = false
		this.isLocked = true
		this.isActive = true
	}

	constructor(args) {
		if (args) {
			Object.assign(this, args)
		}
	}
}
