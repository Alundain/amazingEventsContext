const Contact = () =>{
    return(
        <>
            <div className="center">
                <h1>Contacts</h1>
            </div>
        <div className="container"></div>
            <div className="main">
            <div>
                <form className="form">
                    <label htmlFor="fname">First Name</label>
                    <input type="text" name="firstname" placeholder="Your name.."/>
                    <label htmlFor="email">Email</label>
                    <input type="text" name="emaile" placeholder="Your email.."/>
                    <label htmlFor="country">Message</label>
                    <textarea></textarea>
                    <input type="submit" value="Submit"/>
                </form>
            </div>
        </div>
    
        </>
    )
}
export default Contact