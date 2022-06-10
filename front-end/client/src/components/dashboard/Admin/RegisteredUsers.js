import React from 'react'
import { useAuth } from '../../AuthContext';
import { UserDetail } from './UserDetail';

export const RegisteredUsers = () => {
  const { users, setUsers,  realEstateContract } = useAuth();


  let count = 1
  return (
    <div className='px-4 my-4' style={{overflowX: 'scroll'}}>
        <div className="row">
          <h1>Users</h1>
          <table className="table  table-light border border-secondary">
            <thead className="border border-secondary">
              <tr>
                <th className="border border-secondary" scope="col">
                  Id
                </th>
                <th className="border border-secondary" scope="col">
                  First
                </th>
                <th className="border border-secondary" scope="col">
                  Last
                </th>
                <th className="border border-secondary" scope="col">
                  Email
                </th>
                <th className="border border-secondary" scope="col">
                  Phone
                </th>
                {/* <th className='border border-secondary' scope="col" >age</th> */}
                <th className="border border-secondary" scope="col">
                  address
                </th>
                {/* <th className='border border-secondary' scope="col" >dob</th> */}
                <th className="border border-secondary" scope="col">
                  Approvement
                </th>
                <th className="border border-secondary" scope="col">
                  role
                </th>
                <th className="border border-secondary" scope="col">
                  Set
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => {
                const {
                  _id,
                  firstName,
                  lastName,
                  email,
                  phoneNumber,
                  age,
                  dob,
                  role,
                  address,
                  approvement,
                } = user;
                return (
                  <tr key={_id}>
                    <th className="border border-secondary" scope="row">
                      {count++}
                    </th>
                    <td className="border border-secondary">{firstName}</td>
                    <td className="border border-secondary">{lastName}</td>
                    <td className="border border-secondary">{email}</td>
                    <td className="border border-secondary">{phoneNumber}</td>
                    <td className="border border-secondary">{address}</td>
                    {/* <td className='border border-secondary'>{dob}</td> */}

                    <td
                      className={`border border-secondary  ${
                        approvement == "Approved"
                          ? "text-success"
                          : approvement == "Pending"
                          ? "text-warning"
                          : approvement == "Rejected"
                          ? "text-danger"
                          : ""
                      }`}
                    >
                      {approvement}
                    </td>

                    <td className="border border-secondary">{role}</td>
                    <td className="border border-secondary">
                      <UserDetail getid={_id} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
    </div>
  )
}
