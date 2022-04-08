import { createContext, useEffect, useState } from "react";

export const UserContext = createContext()

const UserContextProvider = (props) => {

  const defaultUser = ({
    user_id: 1,
    img: "img",
    name: "John Doe",
    gender: "Male",
    height: "150",
    weight: "200",
    age: "22"
  })

  useEffect(() => {
    fetch("/user").then(
      result => result.json()
    ).then(
      data => {
        console.log(data)
      }
    )
  }
  )

  const [user, setUser] = useState(defaultUser);

  const updateUser = (updatedUser) => {
    setUser(user => {
      return {
        ...user,
        name: updatedUser.name,
        weight: updatedUser.weight,
        height: updatedUser.height,
        age: updatedUser.age,
      }
    })
  }

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {props.children}
    </UserContext.Provider>
  )
}

export default UserContextProvider;