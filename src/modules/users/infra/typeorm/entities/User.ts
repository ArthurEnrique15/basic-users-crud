import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";

import { Category } from "@modules/categories/infra/typeorm/entities/Category";

import { Address } from "./Address";

@Entity("user")
class User {
    @PrimaryGeneratedColumn("uuid")
    id?: string;

    @Column()
    name: string;

    @Column()
    cpf: string;

    @OneToOne(() => Address, { eager: true })
    @JoinColumn(/* { name: "address_id" } */)
    address: Address;

    // @Column()
    // address_id: string;

    @ManyToOne(() => Category, { eager: true })
    @JoinColumn()
    category: Category;

    // @Column()
    // category_id: string;

    @CreateDateColumn()
    created_at?: Date;

    @UpdateDateColumn()
    updated_at?: Date;

    @DeleteDateColumn()
    deleted_at?: Date;
}

export { User };
