import InfoIcon from "@mui/icons-material/Info";
import "./widgets.css";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

const Widgets = () => {
    const newsArticles = (heading, subtitle) => (
        <div className="widgets_article">
            <div className="widgets_articleLeft">
                <FiberManualRecordIcon />
            </div>
            <div className="widgets_articleRight">
                <h4>{heading}</h4>
                <p>{subtitle}</p>
            </div>
        </div>
    );
    return (
        <div className="widgets">
            <div className="widgets_header">
                <h2>LinkedIn News</h2>
                <InfoIcon />
            </div>
            {newsArticles("This is just a heading", "No subtitles")}
            {newsArticles("This is just a heading", "No subtitles")}
            {newsArticles("This is just a heading", "No subtitles")}
            {newsArticles("This is just a heading", "No subtitles")}
            {newsArticles("This is just a heading", "No subtitles")}
        </div>
    );
};

export default Widgets;
