import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import placeService from "../../../../service/place.service";
import { Favorite, Share, Star } from "@mui/icons-material";
import BookingCard from "../../../../component/BookingCard/index";
import GaleryImage from "../../../../component/GaleryImage/index";
import Link from "next/link";

const Index = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [place, setPlace] = useState({});

    useEffect(() => {
        if (router.isReady) {
            placeService.getPlace(router.query.id).then((res) => {
                setPlace(res.data);
                setLoading(false);
            }).catch((err)=>{
                console.log(err);
              });
        }
    }, [router.isReady]);

    return (
        <div className="page_wrapper">
            <div className="container_page">
                {loading === true ? (
                    "loading"
                ) : (
                    <div className="container">
                        <h1 className="title">{place.title}</h1>
                        <div className="info_content">
                            <div className="rating_comment">
                                <div>
                                    <Star /> <p>4,89</p>
                                </div>
                                .
                                <div>
                                    <p>150 commentaires</p>
                                </div>
                                .
                                <div>
                                    <Favorite /> <p>Superhôte</p>
                                </div>
                                .
                                <div>
                                    <Link href={"https://www.google.com/maps?q="+place.address.street + " " + place.address.zipCode + ", " + place.address.city }>{place.address.street + " " + place.address.zipCode + ", " + place.address.city}</Link>
                                </div>
                            </div>
                            <div className="share_save">
                                <div>
                                    <Share />
                                    <p>Partager</p>
                                </div>
                                <div>
                                    <Favorite />
                                    <p>Enregistrer</p>
                                </div>
                            </div>
                        </div>
                        <div className="container_img">
                            <GaleryImage images={place.image} />
                            {/* {place.image.map((img, index) => {
                                if (index !== 0) {
                                    return (<>
                                        { index < 4 ?
                                        <div className="thumbnail">
                                            <img src={img} alt="Netflix" />
                                        </div> : null}</>
                                    );
                                }
                            })} */}
                        </div>

                        <div className="section_detail">
                            <div className="section_one">
                                <h1>Description :</h1>
                                <p>
                                    {place.description}
                                </p>
                            </div>
                            <div className="container_booking_card">
                                <BookingCard place={place} />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Index;
