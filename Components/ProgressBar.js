import { Box, Center, Progress } from 'native-base';

const ProgressBar = (props) => {

  return (
    
      <Box w="90%" maxW="400">
        <Progress value={props.dataTotal} colorScheme={props.dataTotal > 70 ? "secondary" : "primary"} mx="4" />
      </Box>
    
  )
}

export default ProgressBar