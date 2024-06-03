const Contact = () => {

    return (
        <div>
            <div className="column is-narrow has-text-centered ml-2 mr-2">
                <h1 className="title pt-3 mb-3">Öffnungszeiten</h1>
                <div>
                    <p><span className="has-text-weight-bold">Mo-Do:</span> 11:00 - 22:00</p>
                    <p><span className="has-text-weight-bold">Fr-Sa:</span> 11:00 - 23:00</p>
                    <p><span className="has-text-weight-bold">So:</span> 11:00 - 21:30</p>
                    <p className="pt-3 is-italic">Ab ende März sind wir bei schönem Wetter für Euch da!</p>
                </div>
                <h1 className="title pt-3 mb-3">Kontakt</h1>
                <div>
                    <p>Food Court Biergarten</p>
                    <p>Badstraße 100</p>
                    <p>74072 Heilbronn</p>
                    <p><span>Telefon: </span><a href="tel:07131629180">07131629180</a></p>
                    <p className="mb-3"><a href="mailto:stephan.nagel@food-court.de">stephan.nagel@food-court.de</a></p>
                </div>
                <iframe className="pt-3 mb-3" title="Map of FoodCourt" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2610.50704821404!2d9.201135715674418!3d49.13399662931546!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47982f311ba36d77%3A0xee44491333367bd0!2sFood%20Court%20Biergarten%20%2F%20Winterdorf%20Heilbronn!5e0!3m2!1sde!2sde!4v1655897179910!5m2!1sde!2sde" width="600" height="450" style={{ border: 0 }} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>

        </div >
    )
}

export default Contact