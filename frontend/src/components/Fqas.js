import React from 'react'
import { useState } from 'react'

const Faqs = () => {
    const [selected, setSelected] = useState(null)
    const [place, setPlace] = useState(null)

    const ques = [
        { id: 1, question: "What is an ISA How does it work?", answer: "An Income Share Agreement (ISA) is a way for students to pay OPQ Bootcamp course fee. The OPQ Bootcamp ISA is an agreement between the student and OPQ Bootcamp under which a student agree to pay fixed amount every month to OPQ Bootcamp. The payment starts only once a student is placed in a company after the course completion." },
        { id: 2, question: "Can a student see the copy of ISA?", answer: "Yes, of course. As student go through OPQ admission process, a copy of the same will be made available to student during the course." },
        { id: 3, question: "Does a student need to submit any documents before starting the placement process?", answer: "As per the ISA, a student will be legally bound to furnish all the original documents relevant to his/her education." },
        { id: 4, question: "How do a student pay ISA amount?", answer: "Students are required to pay the ISA in monthly instalments. Complete details with be provided by OPQ Bootcamp after the placements." },
        { id: 5, question: "What is CTC?", answer: "CTC (Cost to Company) is defined as 'Your total salary (including variable pay ), Joining Bonus, compensations, and gross income and including, but not limited to, benefits such as insurance, HRA, health benefits, other benefits and allowances including, but not limited to, house rent allowance, leave travel allowance, conveyance and traveling allowance, pho ne allowance, vehicle allowance and other allowances provided to you from employment or pursuant to self-employment'" },
    ]

    const placementqa = [
        { id: 1, question: "What is an ISA How does it work?", answer: "An Income Share Agreement (ISA) is a way for students to pay OPQ Bootcamp course fee. The OPQ Bootcamp ISA is an agreement between the student and OPQ Bootcamp under which a student agree to pay fixed amount every month to OPQ Bootcamp. The payment starts only once a student is placed in a company after the course completion." },
        { id: 2, question: "Can a student see the copy of ISA?", answer: "Yes, of course. As student go through OPQ admission process, a copy of the same will be made available to student during the course." },
        { id: 3, question: "Does a student need to submit any documents before starting the placement process?", answer: "As per the ISA, a student will be legally bound to furnish all the original documents relevant to his/her education." },
        { id: 4, question: "How do a student pay ISA amount?", answer: "Students are required to pay the ISA in monthly instalments. Complete details with be provided by OPQ Bootcamp after the placements." },
        { id: 5, question: "What is CTC?", answer: "CTC (Cost to Company) is defined as 'Your total salary (including variable pay ), Joining Bonus, compensations, and gross income and including, but not limited to, benefits such as insurance, HRA, health benefits, other benefits and allowances including, but not limited to, house rent allowance, leave travel allowance, conveyance and traveling allowance, pho ne allowance, vehicle allowance and other allowances provided to you from employment or pursuant to self-employment'" },
    ]

    const toggle = (i) => {
        if (selected === i) {
            return setSelected(null)
        }
        setSelected(i)
    }
    const togglep = (p) => {
        if (place === p) {
            return setPlace(null)
        }
        setPlace(p)
    }

    return (
        <section className='bg-blue-100 text-[#000000]'>
            <div className='  px-[4rem] py-[2rem] '>
                <div className=' text-center'>

                    <div><h1 className='text-[3rem]'>FAQs</h1></div>
                    <div><h4>Home  /  FAQs </h4></div>


                </div>
            </div>
            <div className='lg:p-[4rem] lg:mx-[12rem]   '>
                <div className=''>
                    <h1 className='text-center text-[2rem] font-bold'>FAQs</h1>
                    <div>
                        {ques.map((q, i) => (
                            <div key={q.id} className=' text-[1.25rem] mt-[1.25rem]'>
                               <b> <h2 className=' flex flex-row justify-between  ' onClick={() => toggle(i)}>{q.question}
                                    <span> {selected === i ? '-' : '+'}</span></h2></b>
                                <div className=' text-[1rem]'>
                                    {selected === i && q.answer}
                                </div>
                                <hr className='border border-[#000000]'/>
                            </div>
                        ))}
                    </div>

                </div>
            </div>


            <div className='  lg:p-[4rem] lg:mx-[12rem]   '>
                <div className=''>
                    <h1 className='text-center text-[2rem] font-bold'>Placement Questions</h1>
                    <div>
                        {placementqa.map((q, i) => (
                            <div key={q.id} className=' text-[1.25rem] mt-[1.25rem]'>
                                <b><h2 className=' flex flex-row justify-between ' onClick={() => togglep(i)}>{q.question}
                                    <span> {place === i ? '-' : '+'}</span></h2></b>
                                <div className='text-[1rem]'>
                                    {place === i && q.answer}
                                </div>
                                <hr className='border border-[#000000]'/>
                            </div>
                            
                        ))}
                        
                    </div>

                </div>
            </div>
        </section>
    )
}

export default Faqs