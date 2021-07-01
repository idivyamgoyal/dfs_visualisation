export const Header = () => {
    return (
        <div className="header">
            <span className="headerText-left"><a href=".">DFS Visualiser</a></span>
            <a href="https://divyamgoyal.com"><img src={process.env.PUBLIC_URL + "/assets/favicons/favicon.ico"} className="headerText-right" alt="DivyamGoyal" /></a>
        </div>
    )
}