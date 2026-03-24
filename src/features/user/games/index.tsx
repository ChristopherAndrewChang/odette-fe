'use client';

import UserContainer from "../shared/components/UserContainer";
import DiceGame from "./components/dice/DiceGame";

// import DaXiaoGame from "./components/example/da-xiao-dice";

function UserGames() {
    return (
        <UserContainer>
            <DiceGame />
            {/* <DaXiaoGame /> */}

        </UserContainer>
    )
}

export default UserGames;
