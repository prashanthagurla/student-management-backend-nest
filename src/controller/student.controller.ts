import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { response } from 'express';
import { ApiResponseDTO } from 'src/dto/ApiResponseDTO';
import { StudentDTO } from 'src/dto/StudentDTO';
import { Student } from 'src/model/student.model';
import { StudentService } from 'src/service/student.service';

@Controller('api/students')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}
  @Get('get')
  getStudents(): Promise<Student[]> {
    console.log('get controller');
    return this.studentService.getStudents();
  }

  @Post('add/student')
  async createStudent(@Body() studentDto: StudentDTO) {
    const student = await this.studentService.createStudent(studentDto);
    return { success: true, data: student, message: 'Saved Successfully' };
  }
  @Get('/get/:id')
  async getStudentById(@Param('id') id: number): Promise<Student> {
    return await this.studentService.getStudentById(id);
  }
  @Put('/update')
  async updateStudent(@Body() updateData: Student) {
    console.log('put controller');
    await this.studentService.updateStudent(updateData);
    return {
      message: 'Updated Successfully',
    };
  }
  //   @Delete('/delete/:id')
  //   deleteStudent(@Param('id')id:number){
  //     this.studentService.deleteStudent(id);
  //   }
}
