import { test } from '../Fixture/practicePageFixture';


test('Test the web table', async({ PracticePage }) => {
        
        const courses = await PracticePage.webTable();

        for(let i = 0; i < await courses.count(); i++){
            
            const courseText = await courses.nth(i).textContent();
            console.log(`Course ${i + 1}: ${courseText}`);
        }

        console.log("Number of courses in the table:", await courses.count());
});

