import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StudentDTO } from 'src/dto/StudentDTO';
import { Student } from 'src/model/student.model';
import { Any, DataSource, Repository } from 'typeorm';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
  ) {}

  async createStudent(studentDto: StudentDTO): Promise<Student> {
    console.log('service', studentDto);
    try {
      const existing = await this.studentRepository.findOne({
        where: [{ email: studentDto.email }, { rollNo: studentDto.rollNo }],
      });
      if (existing) {
        throw new ConflictException('Student already exists');
      }
      const newStudent = this.studentRepository.create({
        email: studentDto.email,
        rollNo: studentDto.rollNo,
        firstName: studentDto.firstName,
        lastName: studentDto.lastName,
      });
      return await this.studentRepository.save(newStudent);
    } catch (error) {
      console.log('catched error', error.message);
      throw new ConflictException(error.message);
    }
  }
  async getStudents(): Promise<Student[]> {
    try {
      return await this.studentRepository.find();
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async getStudentById(id: number): Promise<Student> {
    const student = await this.studentRepository.findOne({ where: { id } });
    if (!student) {
      throw new NotFoundException('Student not found!');
    }
    return student;
  }
  async updateStudent(student: Student): Promise<void> {
    console.log('put service');

    const existingStudent = await this.studentRepository.findOne({
      where: { id: student.id },
    });
    if (!existingStudent) {
      throw new NotFoundException('Student not found');
    }
    console.log('Student found successfully');
    existingStudent.firstName = student.firstName;
    existingStudent.lastName = student.lastName;
    existingStudent.email = student.email;
    await this.studentRepository.save(existingStudent);
    console.log('updated');
  }
}
