import moment from 'moment';
import { 
    setStartDate, 
    setEndDate, 
    sortByDate, 
    sortByAmount, 
    setTextFilter 
} 
from "../../actions/filters";


test("should generate start date action object",()=>{
    const action = setStartDate(moment(1234));

    expect(action).toEqual({
        type:'SET_START_DATE',
        startDate:moment(1234)
    })
});

test("should generate endDate action object",()=>{
    const action = setEndDate(moment(2345));

    expect(action).toEqual({
        type:'SET_END_DATE',
        endDate:moment(2345)
    })
});

test("should generate sort by date action object",()=>{
    expect(sortByDate()).toEqual({
        type:'SORT_BY_DATE'
    })
});

test("should generate sort by amount filter action object",()=>{
    expect(sortByAmount()).toEqual({
        type:'SORT_BY_AMOUNT'
    })
});

test("should generate set text filter action object with text value",()=>{
    const action = setTextFilter('rent');

    expect(action).toEqual({
        type:'SET_TEXT_FILTER',
        text:'rent'
    })
});

test("should generate set text filter action object with default value",()=>{
    expect(setTextFilter()).toEqual({
        type:'SET_TEXT_FILTER',
        text:''
    })
});