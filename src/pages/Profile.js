import profileImg from '../images/profileimg.png'
import { useState, useContext, useEffect } from 'react'
import { Modal, Button } from 'react-bootstrap'
import EditUser from '../components/EditUser'
import { UserContext } from '../contexts/UserContext'
import { RecipeComponent, RecipeListContainer } from '../components/RecipeComponent'

export default function Profile() {

  const [save, setsave] = useState([]);

  useEffect(() => {
    fetch('/info')
      .then(response => response.json())
      .then(data => {
        setsave(data);
        console.log(data)
      })
  }, [])

  function calculateBMI(weight, height) {
    const weightKG = weight / 2.2
    const heightM = height / 100
    const num = weightKG / (heightM ** 2)
    return num.toFixed(2)
  }

  function calculateStatus(bmi) {
    if (bmi < 18.5) {
      return "Underweight";
    } else if (bmi < 25) {
      return "Normal";
    } else if (bmi < 30) {
      return "Overweight";
    } else {
      return "Obese";
    }
  }

  const { user } = useContext(UserContext)


  const [bmi, setBMI] = useState(calculateBMI(user.weight, user.height))
  const [status, setStatus] = useState(calculateStatus(bmi))

  const [show, setShow] = useState(false)

  const handleShow = () => setShow(true)
  const handleClose = () => setShow(false)

  useEffect(() => {
    handleClose()
  }, [user])

  console.log(save)


  return (
    <>
      <div className="profile">
        <div className='profile--img--box'>
          <img
            className='profile--img'
            src={user.img}
            alt="profile--img"
            onError={(e) => { e.target.src = profileImg }} />
        </div>

        <div className='profile--container'>
          <h1>{user.name}'s Recipe Book</h1>
        </div>
        <div className='profile--info'>
          <h1 className='profile--info-header'> Personal Info</h1>
          <div>
            <p>Height: {user.height}</p>
            <p>Weight: {user.weight}Ibs</p>
            <p>Gender: {user.gender}</p>
            <p>Age: {user.age}</p>
          </div>
          <div>
            <p>BMI: {calculateBMI(user.weight, user.height)}</p>
            <p>Status: {calculateStatus(calculateBMI(user.weight, user.height))}</p>
          </div>
          <Button onClick={handleShow} variant="primary">Edit Info</Button>
        </div>
        <div className='profile--recipes'>
          <h2 text-align="center" padding='100px'> Saved Recipes</h2>
          <RecipeListContainer>
            {save.map((save) => (
              <RecipeComponent recipeObj={save} />
            ))}
          </RecipeListContainer>

        </div>

      </div>
      <Modal show={show}>
        <Modal.Header closebutton>
          <Modal.Title>
            Edit Profile
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditUser user={user} status={setStatus} bmi={setBMI} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close Button
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}