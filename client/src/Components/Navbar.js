import React from "react";

const Navbar = ()=>{

    // const { mode } = playerData;
    // const switchRef = useRef(null);

    // function handleChange() {
    //     const path = mode === 'single' ? '/multiplayer' : '/';
    //     dispatch({ type: 'CHANGE_MODE' })
    //     switchRef.current.focus();
    //     toast.success("Game mode changed");
    //     navigate(path);
    // }

    return (
        <div className="my-3 p-2" style={{ display:'flex', justifyContent:'left', alignItems:'center'}}>
            <h1 className="m-0" style={{marginRight:'40px'}}>TypeRacer</h1>
            <img src="./keyboard.svg" alt="Logo" className="mx-2" style={{width:'48px'}}/>
        </div>
    );
}

export default Navbar;