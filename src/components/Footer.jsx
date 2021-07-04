export const Footer = () => {
    return (
        <div className="myFooter">
            <div className="container">
                <a href="https://divyamgoyal.com"><img src={process.env.PUBLIC_URL + "/assets/favicons/favicon-32x32.png"} alt="DivyamGoyal" /></a>
                <div>
                    Developed by <a href="https://divyamgoyal.com">Divyam Goyal</a>.
                </div>
                <div>
                    <a href="https://github.com/idivyamgoyal">Github</a> | <a href="https://linkedin.com/in/idivyamgoyal">LinkedIn</a> | <a href="mailto:divyamgoyal9930@gmail.com">Mail</a>
                </div>
            </div>
        </div>
    )
}