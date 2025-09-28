import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Location } from "../../locations/entities/location.entity";
import { User } from "src/auth/entities/user.entity";

@Entity()
export class Manager {
    @PrimaryGeneratedColumn('uuid')
    managerId: string;
    @Column('text')
    managerFullName: string
    @Column('float')
    managerSalary: number
    @Column('text',{
        unique: true,
    })
    mangerEmail: string
    @Column('text')
    managerPhoneNumber: string
    // relacion con lacations
@OneToOne(() => Location)
location: Location;

@OneToOne(() => User)
@JoinColumn({
    name: "userId"
})
user: User
}
