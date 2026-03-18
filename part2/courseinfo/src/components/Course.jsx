import { Header } from './Header';
import { Content } from './Content';

export const Course = ({course}) =>   
    (
     <div>
      <Header course={course.name} />
      <Content parts={course.parts} />    
    </div>
    )
