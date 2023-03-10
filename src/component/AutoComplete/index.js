import { useRef, useEffect } from "react";
import styles from "./index.module.scss"

const AutoComplete = (props) => {
const {name,setAddress, defaultValue, classes} = props;
 const autoCompleteRef = useRef();
 const inputRef = useRef();
 const options = {
  componentRestrictions: { country: "fr" },
  fields: ["address_components", "geometry", "icon", "name"],
  types: ["address"]
 };

 useEffect(() => {
    autoCompleteRef.current = new window.google.maps.places.Autocomplete(
     inputRef.current,
     options
    );
    autoCompleteRef.current.addListener("place_changed", async function () {
     const place = await autoCompleteRef.current.getPlace();
     setAddress(place);
    });
   }, []);

 return (
  <div className={styles.input_wrapper}>
   <label>adresse :</label>
   <input name={name} ref={inputRef} defaultValue={defaultValue} />
  </div>
 );
};
export default AutoComplete;