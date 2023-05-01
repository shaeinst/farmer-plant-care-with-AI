import subu from "../assets/subu.png";
import balu from "../assets/balu.png";
import bharti from "../assets/bharti.png";

interface CustomCardInterace {
    name: string;
    description: string;
    image: string;
}

const CustomCard = ({ description, image, name }: CustomCardInterace) => {
    return (
        <div className="profile-container">
            <div className="profile-image-container">
                <img src={image} alt="Profile" />
            </div>
            <div className="profile-details-container">
                <h2>{name}</h2>
                <div>{description}</div>
            </div>
            <style>{`
                .profile-container {
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    justify-content: center;
                    max-width: 400px;
                }
                .profile-image-container {
                }
                .profile-image-container img {
                    height: 150px;
                    width: 150px;
                    object-fit: cover;
                    border-radius: 50%;
                }
                .profile-details-container {
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                }
            `}</style>
        </div>
    );
    // return (
    //     <Card style={{ width: "300px", margin: "10px" }}>
    //         <CardActionArea>
    //             <CardMedia
    //                 component="img"
    //                 height="140"
    //                 image={image}
    //                 alt="green iguana"
    //             />
    //             <CardContent>
    //                 <Typography gutterBottom variant="h5" component="div">
    //                     {title}
    //                 </Typography>
    //                 <Typography variant="body2" color="text.secondary">
    //                     {description}
    //                 </Typography>
    //             </CardContent>
    //         </CardActionArea>
    //     </Card>
    // );
};

//
const About = () => {
    return (
        <div
            style={{
                // background: "red",
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                marginTop: "60px",
            }}
        >
            <CustomCard
                name="Title 1"
                description="i am balram am i don't know what i am doing here"
                image={balu}
            />
            <CustomCard
                name="Title 2"
                description="i would like to thank to balu for being by project friend"
                image={bharti}
            />
            <CustomCard
                name="Title 3"
                description="oe shahid please mero project gar deu na"
                image={subu}
            />
        </div>
    );
};
export default About;
