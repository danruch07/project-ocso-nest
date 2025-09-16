import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { v4 as uuid } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EmployeesService {
  constructor(@InjectRepository(Employee)
private employeeRepository: Repository<Employee> ) 
{}

  async create(createEmployeeDto: CreateEmployeeDto) {
    const employee = await this.employeeRepository.save(createEmployeeDto)
    return employee;
}

  findAll() {
    return this.employeeRepository.find()
  }

  async findOne(id: string) {
    const employee = await this.employeeRepository.findOneBy({ employeeId: id });
    return employee;
  }

  async update(id: string, updateEmployeeDto: UpdateEmployeeDto) {
    const employeeToUpdate = await this.employeeRepository.preload({
      employeeId: id,
      ...updateEmployeeDto
    });
    if(!employeeToUpdate) throw new NotFoundException();
    this.employeeRepository.save(employeeToUpdate);
    return employeeToUpdate; 
  }

  async remove(id: string) {
    const employee = await this.findOne(id);
    if(!employee) {
      throw new NotFoundException(`Employee con id ${id} no encontrado`)
    }
    await this.employeeRepository.delete(id)
    return {message: `Employee con id ${id} eliminado`}
  }
}
