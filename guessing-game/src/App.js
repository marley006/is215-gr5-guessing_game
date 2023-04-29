import './App.css';
import { newGame } from './services/Gameplay'
import React, { useState } from 'react';

import { styled } from '@mui/system';
import { 
  Button,
  Typography,
  LinearProgress,
  Stack,
  Grid,
  Paper,
  TextField
} from '@mui/material';

import Logo from './assets/logo.svg'
import CrystalImage from './assets/crystal.png'

import "@fontsource/poppins/300.css";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";
import "@fontsource/poppins/800.css";

import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#000000',
    },
    secondary: {
      main: '#FFDE59',
    },
  },
});

const MainWrapper = styled('div')(
  ({ theme }) => `
    background: linear-gradient(180deg, #4947B5 0%, #000000 100%);
    min-height: 100vh;
    height: 100%;
    font-family: Poppins;
    text-align: center;
  `
);

const AppLogo = styled('img')({
  width: '25%'
});

const Image = styled('img')({
  width: '10%'
});

const RoundButton = styled(Button)({
  background: '#FFDE59',
  color: '#000000',
  fontWeight: 600,
  borderRadius: '50px',
  padding: '10px 40px',
  marginTop: '30px',
  '&:hover': {
    background: 'transparent',
    color: '#FFDE59',
    border: '1px solid #FFDE59'
  },
});

const ClueCard = styled(Paper)({
  background: '#4947B5',
  color: '#FFFFFF',
  borderRadius: '5px',
  width: '20%',
  padding: '10px'
});

function App() {
  const [currentClueIndex, setCurrentClueIndex] = useState(0);    // count the number of clues provided
  const [guess, setGuess] = useState('');                        // keep track of the user guess
  const [isCorrect, setIsCorrect] = useState(null);             // tag correct guess
  const [category, setCategory] = useState('');
  const [word, setWord] = useState('');
  const [clues, setClues] = useState([]);
  const [hasStarted, setHasStarted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  

  const start = async () => {
    try {
      console.log("creating new game");
      setIsError(false);
      setIsLoading(true);
      setIsCorrect(null);
      setGuess('');
      setCurrentClueIndex(0);

      let payload = await newGame();
      setCategory(payload.category);
      setClues(payload.clues);
      setWord(payload.word);

      // setCategory('Food chain');
      // setClues(['Clue 1', 'Clue 2', 'Clue 3', 'Clue 4', 'Clue 5', 'Clue 6', 'Clue 7', 'Clue 8', 'Clue 9', 'Clue 10', ]);
      // setWord('Jollibee');

      setHasStarted(true);
      setIsLoading(false);
      console.log("game loaded");
    } catch (error) {
      setIsError(true);
    }
    
  }

  const end = async () => {
    setIsError(null);
    setIsCorrect(null);
    setHasStarted(false);
    setIsLoading(false);
    setGuess('');
    setCurrentClueIndex(0);
  }

  function handleGuess() {
    console.log("handle guess", guess);
    if (guess.toLowerCase() === word.toLowerCase()) {
      setIsCorrect(true);
    } else {
      if(currentClueIndex === 9){
        setIsCorrect(false);
        setGuess('');
      } else {
        setCurrentClueIndex(currentClueIndex + 1);
        setGuess('');
        alert("Incorrect guess. Displaying a new clue.");
      }
    }
  }

  return (
    <ThemeProvider theme={theme} className="App">
      <MainWrapper>

        <AppLogo src={Logo} />

        <div style={{ display: hasStarted || (isLoading && isCorrect === null && isError !== null) ? "none" : "block" }}> 
          <Typography variant='h4' sx={{ marginTop: '50px', textAlign: 'center', color: '#FFFFFF' }}>Welcome, dear challenger.</Typography>
          <RoundButton onClick={start}>Start Game</RoundButton>
        </div>

        <div style={{ display: isLoading && (isCorrect === null && isError !== true) ? "block" : "none" }}> 
          <Typography variant='h6' sx={{ marginTop: '50px', textAlign: 'center', color: '#FFFFFF' }}>Starting the game...</Typography>
          <Grid container sx={{ marginTop: '10px' }}>
            <Grid item sm={4}></Grid>
            <Grid item sm={4}>
              <LinearProgress color='secondary' sx={{ paddingTop: '3px', borderRadius: '5px' }} />
            </Grid>
          </Grid>
        </div>

        <div style={{ display: hasStarted && isCorrect === null && isError !== true && !isLoading ? "block" : "none" }}> 
          <Typography variant='h6' sx={{ marginTop: '30px', textAlign: 'center', color: '#FFFFFF' }}>Your category is</Typography>
          <Typography variant='h5' sx={{ fontWeight: '700', textAlign: 'center', color: '#FFDE59' }}>{category}</Typography>
        </div>

        <div style={{ display: hasStarted && isCorrect === null && isError !== true && !isLoading ? "block" : "none" }}> 
          { (clues.length > 0) ?
            <div>
              <Typography variant='h6' sx={{ marginTop: '20px', textAlign: 'center', color: '#FFFFFF' }}>Here is a clue:</Typography>
              <Stack direction='row' justifyContent='center' sx={{ marginTop: '10px' }}>
                <ClueCard>{clues[currentClueIndex]}</ClueCard>
              </Stack>

              <Stack direction='row' justifyContent='center' sx={{ marginTop: '10px' }}>
                <Typography variant='body1' sx={{ marginTop: '20px', marginRight: '5px', color: '#FFFFFF' }}>You only have</Typography>
                <Typography variant='body1' sx={{ marginTop: '20px', fontWeight: '700', marginRight: '5px', color: '#FFDE59' }}>{11 - (currentClueIndex + 1)} </Typography>
                <Typography variant='body1' sx={{ marginTop: '20px', color: '#FFFFFF' }}>tries left</Typography>
              </Stack>
              
              <Stack direction='row' justifyContent='center' sx={{ marginTop: '10px' }}>
                <TextField
                  autoFocus
                  fullWidth
                  variant="filled"
                  size='small'
                  value={guess}
                  onChange={(e) => {setGuess(e.target.value)}}
                  label="Type your answer..."
                  sx={{ background: '#FFFFFF', width: '400px', borderRadius: '5px' }}
                />
              </Stack>
              <RoundButton onClick={handleGuess}>Submit</RoundButton>
            </div> :  ""
          }
        </div>
        
        { isCorrect === true && isError !== true &&
          <>
            <Typography variant='h6' sx={{ marginTop: '30px', textAlign: 'center', color: '#FFFFFF' }}>You win!</Typography>
            <Stack direction='row' justifyContent='center' sx={{ marginTop: '10px' }}>
              <Typography variant='h5' sx={{ marginRight: '5px', color: '#FFFFFF' }}>You are the</Typography>
              <Typography variant='h5' sx={{ fontWeight: '700', marginRight: '5px', color: '#FFDE59' }}>Guess Master!</Typography>
            </Stack>
            <Image src={CrystalImage} sx={{ marginTop: '30px' }} />
            <Stack direction='row' justifyContent='center' alignItems='center' sx={{ marginTop: '10px' }}>
              <RoundButton onClick={start}>Play Again</RoundButton>
              <Typography variant='body1' onClick={end} sx={{ fontWeight: '700', marginLeft: '20px', marginTop: '28px', color: '#FFDE59', cursor: 'pointer' }}>End Game</Typography>
            </Stack>
          </>
        }

        { isCorrect === false && isError !== true &&
          <>
            <Typography variant='h6' sx={{ marginTop: '30px', textAlign: 'center', color: '#FFFFFF' }}>You lose!</Typography>
            <Stack direction='row' justifyContent='center' sx={{ marginTop: '10px' }}>
              <Typography variant='h5' sx={{ marginRight: '5px', color: '#FFFFFF' }}>Bow to the</Typography>
              <Typography variant='h5' sx={{ fontWeight: '700', marginRight: '5px', color: '#FFDE59' }}>Guess Master!</Typography>
            </Stack>
            <Typography variant='h6' sx={{ marginTop: '30px', textAlign: 'center', color: '#FFFFFF' }}>The correct word is</Typography>
            <Typography variant='h5' sx={{ fontWeight: '700', textAlign: 'center', color: '#FFDE59' }}>{word}</Typography>
            <Stack direction='row' justifyContent='center' alignItems='center' sx={{ marginTop: '10px' }}>
              <RoundButton onClick={start}>Play Again</RoundButton>
              <Typography variant='body1' onClick={end} sx={{ fontWeight: '700', marginLeft: '20px', marginTop: '28px', color: '#FFDE59', cursor: 'pointer' }}>End Game</Typography>
            </Stack>
          </>
        }

        { isError === true &&
          <>
            <Typography variant='h6' color='error' sx={{ marginTop: '50px', textAlign: 'center' }}>Failed to load the game.</Typography>
            <Stack direction='row' justifyContent='center' alignItems='center'>
              <RoundButton onClick={start}>Try Again</RoundButton>
              <Typography variant='body1' onClick={end} sx={{ fontWeight: '700', marginLeft: '20px', marginTop: '28px', color: '#FFDE59', cursor: 'pointer' }}>End Game</Typography>
            </Stack>
          </>
        }

      </MainWrapper>
    </ThemeProvider>
  );
}

export default App;
