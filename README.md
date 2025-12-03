
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

