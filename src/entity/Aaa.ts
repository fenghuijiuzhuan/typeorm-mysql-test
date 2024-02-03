import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

// @Entity 指定它是一个 Entity
@Entity({
    name: 't_aaa', // name 指定表名为 t_aaa。
})
export class Aaa {
    // @PrimaryGeneratedColumn 指定它是一个自增的主键，
    @PrimaryGeneratedColumn({
        comment: '这是id', // 通过 comment 指定注释
    })
    id: number

    // @Column 映射属性和字段的对应关系
    @Column({
        name: 'a_aa', // name 指定字段名
        type: 'text', // type 指定映射的类型
        comment: '这是 aaa'
    })
    aaa: string

    @Column({
        unique: true, // unique 设置 UNIQUE 唯一索引
        nullable: false, // nullable 设置 NOT NULL 约束
        length: 10, // length 指定长度
        type: 'varchar', // type 这里指定的都是数据库里的数据类型
        default: 'bbb' // default 指定默认值
    })
    bbb: string

    @Column({
        type: 'double'
    })
    ccc: number
}