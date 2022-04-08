import { Form, Button } from 'react-bootstrap'
import { useContext, useState } from 'react'
import { UserContext } from '../contexts/UserContext';

export default function EditUser(props) {

  function calculateBMI(weight, height) {
    const num = weight / (height ** 2);
    return num
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

  const { updateUser } = useContext(UserContext);

  const [name, setName] = useState(props.user.name);
  const [age, setAge] = useState(props.user.age);
  const [height, setHeight] = useState(props.user.height);
  const [weight, setWeight] = useState(props.user.weight);

  const updatedUser = { name, age, height, weight }
  const updatedBMI = calculateBMI(updatedUser.weight, updatedUser.height)


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(updatedUser.name)
    updateUser(updatedUser);
    props.setBMI(updatedBMI)
    props.setStatus(calculateStatus(updatedBMI))
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Control
          type="text"
          placeholder='Name *'
          name='name'
          onChange={(e) => setName(e.target.value)}
          value={name}
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Control
          type="text"
          placeholder='Age *'
          name='age'
          onChange={(e) => setAge(e.target.value)}
          value={age}
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Control
          type="text"
          placeholder='Height (in centemeters) *'
          name='height'
          onChange={(e) => setHeight(e.target.value)}
          value={height}
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Control
          type="text"
          placeholder='Weight (in pounds) *'
          name='weight'
          onChange={(e) => setWeight(e.target.value)}
          value={weight}
          required
        />
      </Form.Group>
      <Button variant='success' type="submit" block>
        Edit Profile
      </Button>
    </Form>
  )

}