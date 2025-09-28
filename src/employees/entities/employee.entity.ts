import { IsOptional } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Location } from 'src/locations/entities/location.entity';
import { User } from 'src/auth/entities/user.entity';

@Entity()
export class Employee {
    @PrimaryGeneratedColumn('uuid')
    employeeId: string;
    @Column ('text')
    name: string
    @Column ('text')
    lastName: string
    @Column ('text')
    phoneNumber: string
    @Column ('text')
    email: string
    @IsOptional()
    @Column('text', { nullable: true })
    photoUrl: string

    @ManyToOne(() => Location, (location) => location.employees)
    @JoinColumn({
        name: 'locationId'
    })
    location: Location[];

    @OneToOne(() => User)
    @JoinColumn({
        name: "UserId"
    })
    user:User

}
