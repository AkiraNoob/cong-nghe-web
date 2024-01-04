import CancelIcon from '@mui/icons-material/Cancel';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Radio, TextField, Typography } from '@mui/material';
import React from 'react';
interface SelectionQuestionProps{
  id: string,
  nameLesson: string,
  descriptionLesson: string,
  textResultA: string,
  textResultB: string,
  textResultC: string,
  textResultD: string,
  clickDelete: () => void,
}


const SelectionQuestion: React.FC<SelectionQuestionProps> = ({id, nameLesson, descriptionLesson, textResultA, textResultB, textResultC, textResultD, clickDelete}) => {

  const [selectedValue, setSelectedValue] = React.useState('a');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
  };

  return (
    <div className='rounded-2xl'>
      <Accordion>
        <div className='flex items-center bg-gray-200'>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            className='flex-auto'
          >
            <Typography>Bài {id}</Typography>
          </AccordionSummary>
          <button onClick={clickDelete}>
            <CancelIcon className='mr-3'></CancelIcon>
          </button> 
        </div>
        <AccordionDetails>
          <div className='flex-col flex space-y-4 pr-7 pl-7 pb-7'>
              <TextField
                label="Câu hỏi"
                name="title"
                value={nameLesson != null? nameLesson: null}
                // onChange={(e) => set(e.target.value)}
                multiline
                required
              />
              <TextField
                label="Giải thích"
                name="description"
                value={descriptionLesson != null? descriptionLesson: null}
                // onChange={(e) => set(e.target.value)}
                multiline
                required
              />
              <div className='flex items-center flex-row'>
                <Radio
                  checked={selectedValue === 'a'}
                  onChange={handleChange}
                  value="a"
                  name="radio-buttons_a"
                  inputProps={{ 'aria-label': 'A' }}
                />
                <span className='mr-3'>A.</span>
                <TextField
                  label="Đáp án A"
                  name="title_a"
                  sx={{width: '100%'}}
                  value={textResultA != null ? textResultA: null}
                  // onChange={(e) => set(e.target.value)}
                  required
                />
              </div>
              <div className='flex items-center'>
                <Radio
                  checked={selectedValue === 'b'}
                  onChange={handleChange}
                  value="b"
                  name="radio-buttons_b"
                  inputProps={{ 'aria-label': 'B' }}
                />
                <span className='mr-3'>B.</span>
                <TextField
                  label="Đáp án B"
                  name="title_b"
                  value={textResultB != null ? textResultB: null}
                  sx={{width: '100%'}}
                   // onChange={(e) => set(e.target.value)}
                  multiline
                />
              </div>
              <div className='flex items-center'>
                <Radio
                  checked={selectedValue === 'c'}
                  onChange={handleChange}
                  value="c"
                  name="radio-buttons_c"
                  inputProps={{ 'aria-label': 'C' }}
                />
                <span className='mr-3'>C.</span>
                <TextField
                  label="Đáp án C"
                  name="title_c"
                  value={textResultC != null ? textResultC: null}
                  sx={{width: '100%'}}
                  // onChange={(e) => set(e.target.value)}
                  multiline
                />
              </div>
              <div className='flex items-center'>
                <Radio
                  checked={selectedValue === 'd'}
                  onChange={handleChange}
                  value="d"
                  name="radio-buttons_d"
                  inputProps={{ 'aria-label': 'D' }}
                />
                <span className='mr-3'>D.</span>
                <TextField
                  label="Đáp án D"
                  name="title_d"
                  value={textResultD != null ? textResultD: null}
                  sx={{width: '100%'}}
                  // onChange={(e) => set(e.target.value)}
                  multiline
                />
              </div>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
    
  )
}

export default SelectionQuestion