//
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { useNavigate } from "react-router-dom";
import plantExpert from "../assets/plant-experts.jpg";
import plant from "../assets/plant.jpg";

interface CustomCardInterace {
    title: string;
    description: string;
    image: string;
    link: string;
}

const CustomCard = ({
    description,
    image,
    title,
    link,
}: CustomCardInterace) => {
    const navigate = useNavigate();

    return (
        <Card style={{ width: "300px", margin: "10px" }}>
            <CardActionArea onClick={() => navigate(link)}>
                <CardMedia component="img" height="140" image={image} />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {description}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

const Home = () => {
    return (
        <div
            style={{
                // background: "red",
                minHeight: "80vh",
                justifyContent: "center",
            }}
        >
            <div
                style={{
                    borderLeft: "4px solid #7a7a7a",
                    padding: "10px 20px",
                    margin: "20px",
                }}
            >
                <p
                    style={{
                        fontSize: "1.2rem",
                        fontStyle: "italic",
                        color: "#333",
                        lineHeight: 1.5,
                        textAlign: 'center'
                    }}
                >
                    <h3>
                        {" "}
                        i wanted to be cool so i said i will make a ai website
                        but see how is developing it now
                    </h3>
                </p>
            </div>

            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    flexWrap: "wrap",
                }}
            >
                <CustomCard
                    title="detect disease"
                    description="you can detect disease here"
                    image={plant}
                    link="detector/"
                />
                <CustomCard
                    title="get help"
                    description="get help from the experts"
                    image={plantExpert}
                    link="help/"
                />
            </div>
        </div>
    );
};
export default Home;
