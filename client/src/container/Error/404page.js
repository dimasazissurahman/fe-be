
export const NotFound = () => {

    const handleClick = () => {
        window.location.href = '/';
    }

    return (
        <>
            <div>NOT FOUND PAGES</div>
            <button onClick={() => handleClick()}>Click here to go to home page</button>
        </>
    )
}