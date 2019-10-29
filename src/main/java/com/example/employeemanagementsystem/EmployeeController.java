package com.example.employeemanagementsystem;

import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class EmployeeController {

    @GetMapping("/indexPaginated")
    // ArrayList<ArrayList<String>>
    public HashMap<String, Object> indexPaginated(@RequestParam("page") String page, @RequestParam("rows") String rows) {
        String offset = Integer.toString((Integer.parseInt(page) - 1) * Integer.parseInt(rows));
        ArrayList<HashMap<String, Object>> Rows = MySQL.Query("select * from employees order by employeeId desc limit " + rows + " offset " + offset);
        ArrayList<HashMap<String, Object>> total = MySQL.Query("select count(*) as total from employees");
        HashMap<String, Object> map = new HashMap<String, Object>();
        map.put("rows", Rows);
        map.put("total", total.get(0).get("total"));
        //String json = "{\"total\":" + count.get(0).get(0) + ",\"rows\":" + data + "}";
        //return json;
        return map;
    }

    @GetMapping("/searchEmployee")
    // ArrayList<ArrayList<String>>
    public HashMap<String, Object> indexPaginated(@RequestParam("page") String page, @RequestParam("rows") String rows, @RequestParam("term") String term) {
        String offset = Integer.toString((Integer.parseInt(page) - 1) * Integer.parseInt(rows));
        String sql = "select * from employees";
        String sql2 = "select count(*) as total from employees";
        if (term != ""){
            sql += " where firstName like '%" + term + "%'";
            sql2 += " where firstName like '%" + term + "%'";
        }
        sql += String.format(" order by employeeId desc limit %s offset %s",rows,offset);
        ArrayList<HashMap<String, Object>> Rows = MySQL.Query(sql);
        ArrayList<HashMap<String, Object>> total = MySQL.Query(sql2);
        HashMap<String, Object> map = new HashMap<String, Object>();
        map.put("rows", Rows);
        map.put("total", total.get(0).get("total"));
        //String json = "{\"total\":" + count.get(0).get(0) + ",\"rows\":" + data + "}";
        //return json;
        return map;
    }

    @PostMapping("/employees")
    // ArrayList<ArrayList<String>>
    public Object createEmployee(@RequestBody String employee) {
        String[] body = employee.split("&");
        String firstName = body[0].split("=")[1];
        String lastName = body[1].split("=")[1];
        String major = body[2].split("=")[1];
        String bio = body[3].split("=")[1];
        String age = body[4].split("=")[1];
        String grade = body[5].split("=")[1];
        String gpa = body[6].split("=")[1];
        String gender = body[7].split("=")[1];
        String sql = String.format("insert into employees (firstName, lastName, major, bio, age, grade, gpa, gender) values ('%s','%s','%s','%s','%s','%s','%s','%s')",
                firstName,lastName,major,bio,age,grade,gpa,gender);
//        String sql = "update students set firstName=" + firstName + ",lastName=" + lastName +
//                ",major=" + major + ",bio=" + bio + ",age=" + age + ",grade=" + grade +
//                ",gpa=" + gpa + ",gender=" + gender + " where studentId=" + studentId;
        int Rows = MySQL.Update(sql);
        return Rows;
    }

    @PostMapping("/employees/{employeeId}")
    // ArrayList<ArrayList<String>>
    public Object editEmployee(@PathVariable String employeeId, @RequestBody String employee) {
        String[] body = employee.split("&");
        String firstName = body[0].split("=")[1];
        String lastName = body[1].split("=")[1];
        String major = body[2].split("=")[1];
        String bio = body[3].split("=")[1];
        String age = body[4].split("=")[1];
        String grade = body[5].split("=")[1];
        String gpa = body[6].split("=")[1];
        String gender = body[7].split("=")[1];
        String sql = String.format("update employees set firstName='%s', lastName='%s', major='%s', bio='%s', age='%s', grade='%s', gpa='%s', gender='%s' where employeeId=%s",
                firstName,lastName,major,bio,age,grade,gpa,gender,employeeId);
//        String sql = "update students set firstName=" + firstName + ",lastName=" + lastName +
//                ",major=" + major + ",bio=" + bio + ",age=" + age + ",grade=" + grade +
//                ",gpa=" + gpa + ",gender=" + gender + " where studentId=" + studentId;
        int Rows = MySQL.Update(sql);
        return Rows;
    }

    @GetMapping("/deleteEmployee/{employeeId}")
    // ArrayList<ArrayList<String>>
    public Object deleteEmployee(@PathVariable String employeeId) {
        String sql = String.format("delete from employees where employeeId=%s",employeeId);
        int Rows = MySQL.Update(sql);
        return Rows;
    }
}
