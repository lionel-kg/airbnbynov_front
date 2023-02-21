export default {
    
    createAddress(address){
        let newAddress = {}
        address.address_components.forEach(element => {
            if(element["types"]){
                if(element["types"].includes("postal_code")){
                    newAddress.zipCode = element.long_name;
                }
                if(element["types"].includes("locality")) {
                    newAddress.city = element.long_name;
                }
                if(element["types"].includes("route")) {
                    newAddress.street = element.long_name;
                }
            }
        });
        newAddress.gps = {
            lat: address.geometry.location.lat(),
            long: address.geometry.location.lng()
        }

        console.log(address.geometry.location.lat())
        // address.geometry.location.forEach((element,key) => {
        //     if(key === "lat") {
        //         newAddress.gps
        //     }
        // })
        console.log(newAddress);
        return newAddress;
    }
}