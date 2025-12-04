
This backend is built using **GraphQL** and provides a complete employee management system with authentication, authorization, CRUD operations, filtering, sorting, and pagination.
## **Features Implemented**

### **1. Backend Setup**

* Built a GraphQL API using Node.js.
* Connected database for storing employee records.

### **2. Data Model**
Each employee record contains:

* `id`
* `name`
* `email`
* `age`
* `class`
* `subjects`
* `attendance`
* `role` (admin / employee)

---

## **3. GraphQL Schema**

### **Queries**

* **List Employees** (with optional filters, pagination, and sorting)
* **Get Single Employee** (retrieve details of one employee)
* **Paginated Employee List**

### **Mutations**

* **Register** (employee or admin)
* **Login**
* **Add Employee** (admin only)
* **Update Employee** (admin only)

---

## **4. Authentication & Authorization**

* JWT-based user authentication.
* Role-based access control:

  * **Employee:**

    * Can register, login, and view permitted data.
    * Cannot add or update employee records.
  * **Admin:**

    * Full access — can add, update, and manage all employees.

---

## **5. Step-by-Step Flow**

### **Employee Flow**

1. **Register:** Employee signs up with basic details; role = *employee*.
2. **Login:** Employee logs in and receives a JWT token.
3. **Access:** Employee can view data allowed by the admin but **cannot** add/update employees.

### **Admin Flow**

1. **Register (Admin):** Admin signs up with role = *admin*.
2. **Login:** Admin logs in and receives a JWT token with admin privileges.
3. **Admin Capabilities:**

   * Add employees
   * Update employee records
   * View all employee data
   * Access all admin-only queries and mutations

---

## **6. Pagination & Sorting**

* Employee list supports **page number**, **page size**, and **sorting** on fields like name, age, etc.
* Reduces server load and improves performance.

---

## **7. Performance Considerations**

* Efficient database querying.
* Pagination to avoid overfetching.
* Optimized filters and indexes for faster searches.
* Clean resolver structure to reduce computation overhead.

---

## **8. Screenshots**

<img width="1410" height="807" alt="image" src="https://github.com/user-attachments/assets/a0feb5e6-6291-4c89-bdd8-1d34b6c35fce" />
<img width="1419" height="833" alt="image" src="https://github.com/user-attachments/assets/2deef16f-4a62-4e55-b182-d5a8782fbabd" />
<img width="1251" height="797" alt="image" src="https://github.com/user-attachments/assets/55de86fd-d2e4-45fc-bebb-ddedc697b2ca" />
<img width="1423" height="822" alt="image" src="https://github.com/user-attachments/assets/040b13d0-e620-4ac7-a03d-f204c433f089" />
<img width="1402" height="851" alt="image" src="https://github.com/user-attachments/assets/16802662-4181-4636-890e-887644b8f013" />
<img width="1385" height="829" alt="image" src="https://github.com/user-attachments/assets/6d6f3e56-f484-4f45-8083-775d752b2799" />
<img width="1434" height="806" alt="image" src="https://github.com/user-attachments/assets/221be213-4b3d-491a-bd7c-c135576a8d67" />
<img width="1413" height="843" alt="image" src="https://github.com/user-attachments/assets/9a72d73e-f3f4-442f-b817-94599e29ac16" />







 


