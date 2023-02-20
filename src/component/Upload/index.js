import React from 'react'
import Input from '../Input'

const index = (props) => {
    const {handleChange} = props;

    

  return (
    <Input
    type="file"
    name="image"
    multiple
    accept="image/png , image/jpeg, image/webp"
    handleChange={handleChange}
    />
  )
}

export default index