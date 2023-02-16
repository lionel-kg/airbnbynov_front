import {createContext, React, useState, useEffect} from 'react';

const WishlistContext = createContext({
    places: [],
});

export default WishlistContext;

export const WishlistContextProvider = ({children}) => {

    useEffect(() => {
        if(localStorage.getItem("wishList") !== null) {
            setWishList(JSON.parse(localStorage.getItem("wishList")));
        }
    }, []);
    const [wishList, setWishList] = useState([]);
    // const [isFavorite, setIsFavorite] = useState(false);
    
    
        // useEffect(() => {
        //     console.log(wishList);
        // }, [wishList]);
    const removePlaceFromWishList = (id) => {
        const newList = wishList.filter((item) => item._id !== id);
        localStorage.setItem("wishList", JSON.stringify(newList));
        setWishList(newList);
    }

    const addPlaceFromWishList = (place,setIsFavorite) => {
        //... 
        const newListArray = [];
    
        //Si j'ai déjà un ou des places dans mon localstorage
        if (localStorage.getItem("wishList")) {
          const localStorageMyList = JSON.parse(localStorage.getItem("wishList"));
          localStorageMyList.forEach((places) => {
            newListArray.push(places);
          });
    
          const indexOfExisting = newListArray.findIndex((el) => el._id === place._id);
            if (indexOfExisting !== -1) {
            }
            else {
                newListArray.push(place);
            }
          localStorage.setItem("wishList", JSON.stringify(newListArray));
        }
        //Si localstorage vide
        else {
          newListArray.push(place);
          localStorage.setItem("wishList", JSON.stringify(newListArray));
        }
        setWishList(newListArray)        
    }

    const deleteWishList = () =>{
        setWishList([]);
    }

    const context = {
        removePlaceFromWishList,
        addPlaceFromWishList,
        deleteWishList,
        wishList
    }

    return (
        <WishlistContext.Provider value={context}>
            {children}
        </WishlistContext.Provider>
    );
}

