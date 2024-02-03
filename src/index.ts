import { In } from "typeorm";
import { AppDataSource } from "./data-source"
import { User } from "./entity/User"

AppDataSource.initialize().then(async () => {

    //  typeorm 里新增和修改的方式，使用 save 方法。

    // const user = new User()
    // 指定了id就是更新 
    // user.id = 1
    // user.firstName = "aaa111"
    // user.lastName = "bbb"
    // user.age = 25
    // await AppDataSource.manager.save(user)

    // 批量插入
    // await AppDataSource.manager.save(User, [
    //     { firstName: 'ccc', lastName: 'ccc', age: 21},
    //     { firstName: 'ddd', lastName: 'ddd', age: 22},
    //     { firstName: 'eee', lastName: 'eee', age: 23}
    // ]);
    
    // 批量修改
    // await AppDataSource.manager.save(User, [
    //     { id: 2, firstName: 'ccc222', lastName: 'ccc', age: 21},
    //     { id: 3, firstName: 'ddd333', lastName: 'ddd', age: 22},
    //     { id: 4, firstName: 'eee444', lastName: 'eee', age: 23}
    // ]);


    // delete 和 remove 的区别是，delete 直接传 id、而 remove 则是传入 entity 对象。

    // 删除
    // await AppDataSource.manager.delete(User, 1);
    // const user = new User();
    // user.id = 1;
    // await AppDataSource.manager.remove(User, user);

    // 批量删除
    // await AppDataSource.manager.delete(User, [2,3]);

    // 查询
    // await AppDataSource.manager.save(User, [
    //     { firstName: 'ccc', lastName: 'ccc', age: 21},
    //     { firstName: 'ddd', lastName: 'ddd', age: 22},
    //     { firstName: 'eee', lastName: 'eee', age: 23}
    // ]);
    // const users = await AppDataSource.manager.find(User);
    // console.log(users);
    
    // 查询条件
    // const users = await AppDataSource.manager.findBy(User, {
    //     age: 23
    // });
    // console.log(users);

    // 有多少条记录
    // const [users, count] = await AppDataSource.manager.findAndCount(User);
    // console.log(users, count);
    // const [users, count] = await AppDataSource.manager.findAndCountBy(User, {
    //     age: 23
    // })
    // console.log(users, count);

    // 查询一条，使用 findOne
    // const user = await AppDataSource.manager.findOne(User, {
    //     select: {
    //         firstName: true,
    //         age: true
    //     },
    //     where: {
    //         id: 4
    //     },
    //     order: {
    //         age: 'ASC'
    //     }
    // });
    // console.log(user);

    
    // const users = await AppDataSource.manager.find(User, {
    //     select: {
    //         firstName: true,
    //         age: true
    //     },
    //     where: {
    //         id: In([4, 8])
    //     },
    //     order: {
    //         age: 'ASC'
    //     }
    // });
    // console.log(users);

    
    // const user = await AppDataSource.manager.findOneBy(User, {
    //     age: 23
    // });
    // console.log(user);

    // findOneOrFail 或者 findOneByOrFail，如果没找到，会抛一个 EntityNotFoundError 的异常：
    // try {
    //     const user = await AppDataSource.manager.findOneOrFail(User, {
    //         where: {
    //             id: 666
    //         }
    //     });
    //     console.log(user);
    // }catch(e) {
    //     console.log(e);
    //     console.log('没找到该用户');
    // }

    // query 方法直接执行 sql 语句
    // const users = await AppDataSource.manager.query('select * from user where age in(?, ?)', [21, 22]);
    // console.log(users);


    // 复杂 sql 语句不会直接写，而是会用 query builder：
    // const queryBuilder = await AppDataSource.manager.createQueryBuilder();
    // const user = await queryBuilder.select("user")
    //     .from(User, "user")
    //     .where("user.age = :age", { age: 21 })
    //     .getOne();
    // console.log(user);


    // 涉及到多个表，也就是多个 Entity 的关联查询，就得用 query builder 了。

    // 简单点查询直接 find 指定 where 条件就行。

    // 此外，多条有关联的数据的增删改都离不开事务，怎么开启事务呢？

    // 用 transaction 方法包裹下就好了。
    // await AppDataSource.manager.transaction(async manager => {
    //     await manager.save(User, {
    //         id: 4,
    //         firstName: 'eee',
    //         lastName: 'eee',
    //         age: 20
    //     });
    // });

    // 先调用 getRepository 传入 Entity，拿到专门处理这个 Entity 的增删改查的类，再调用这些方法
    const user = AppDataSource.manager.getRepository(User)
    const one = await user.find()
    console.log(one);
    

    // 总结
    // 具体的 EntityManager 和 Repository 的方法有这些：

    // save：新增或者修改 Entity，如果传入了 id 会先 select 再决定修改还新增
    // update：直接修改 Entity，不会先 select
    // insert：直接插入 Entity
    // delete：删除 Entity，通过 id
    // remove：删除 Entity，通过对象
    // find：查找多条记录，可以指定 where、order by 等条件
    // findBy：查找多条记录，第二个参数直接指定 where 条件，更简便一点
    // findAndCount：查找多条记录，并返回总数量
    // findByAndCount：根据条件查找多条记录，并返回总数量
    // findOne：查找单条记录，可以指定 where、order by 等条件
    // findOneBy：查找单条记录，第二个参数直接指定 where 条件，更简便一点
    // findOneOrFail：查找失败会抛 EntityNotFoundError 的异常
    // query：直接执行 sql 语句
    // createQueryBuilder：创建复杂 sql 语句，比如 join 多个 Entity 的查询
    // transaction：包裹一层事务的 sql
    // getRepository：拿到对单个 Entity 操作的类，方法同 EntityManager

}).catch(error => console.log(error))
