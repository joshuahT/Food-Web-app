import { createContext, useEffect, useState } from "react";

export const UserContext = createContext()

const UserContextProvider = (props) => {

  const defaultUser = ({
    id: 1,
    img: "img",
    name: "John Doe",
    gender: "Male",
    height: "150",
    weight: "200",
    age: "22"
  })

  const [user, setUser] = useState(defaultUser);

  useEffect(() => {
    fetch("/user", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(
      result => result.json()
    ).then(
      data => {
        console.log(data)
        setUser(userPrev => {
          return {
            ...userPrev,
            id: data.id,
            img: data.img_url,
            name: data.username,
            gender: data.gender,
            height: data.height,
            weight: data.weight,
            age: data.age
          }
        })
      }
    )
  }, []
  )



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