'use client';

import UserContainer from "../shared/components/UserContainer";
import CoinGames from "./components/coin";

// import DiceGame from "./components/dice/DiceGame";

// import DaXiaoGame from "./components/example/da-xiao-dice";

function UserGames() {
    return (
        <UserContainer>
            {/* <DiceGame /> */}
            {/* <DaXiaoGame /> */}

            {/* <CoinFlipGame /> */}
            <CoinGames />
            {/* <CoinGames /> */}
        </UserContainer>
    )
}

export default UserGames;
