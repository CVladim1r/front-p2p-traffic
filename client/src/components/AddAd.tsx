function AddAd() {
    return (
        <div className="add-ad">
            <p className="add-ad-header">Создайте объявление</p>
            <form onSubmit={() => console.log("submit")} className="add-ad-form">
                <div className="add-ad-form-row">
                    <p className="add-ad-form-row-key">Приход</p>

                </div>
            </form>
        </div>
    )
}

export default AddAd