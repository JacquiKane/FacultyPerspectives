/* ==========================================================
   Survey data – Faculty Perspectives on Academic Integrity
   Edit this file to update statistics or comments.
   ========================================================== */
window.SurveyData = {

  /* Headline statistics (Overview section) */
  stats: [
    { value: 80,   suffix: '%',    icon: 'visibility', label: 'of responding faculty have observed academic integrity issues' },
    { value: 100,  suffix: '%',    icon: 'domain',     label: 'of respondents to the question say integrity issues hurt the institute\'s reputation' },
    { value: 80,   suffix: '%',    icon: 'work',       label: 'believe unchecked dishonesty may impair applying knowledge in later careers' },
    { value: 58,   suffix: '%',    icon: 'smart_toy',  label: 'cite over-reliance on AI as the most significant factor behind dishonesty' },
    { value: 6.78, suffix: ' hrs', icon: 'schedule',   label: 'average weekly time spent grading (high of 20 hours)', decimals: 2 },
    { value: 39,   suffix: '%',    icon: 'report',     label: 'fear enforcing integrity consequences could hurt their performance review' }
  ],

  /* Reasons for dishonesty (survey order) */
  reasons: [
    { label: 'Lack of time to prepare',               value: 32 },
    { label: 'Did not prioritize preparation',        value: 21 },
    { label: 'Did not attend class',                  value: 53 },
    { label: 'Non-submission of graded assignments',  value: 42 },
    { label: 'Submissions were not done by student',  value: 47 },
    { label: 'Mental health issues',                  value: 21 },
    { label: 'Over-reliance on AI',                   value: 58 }
  ],

  /* Faculty comments grouped by theme */
  comments: {

    /* ---------- Responses to academic integrity issues ---------- */
    policies: {
      themes: [
        {
          title: 'Syllabus & Policy Statements',
          icon: 'description',
          summary: 'Standard university wording and clear expectations of original work.',
          comments: [
            `All work submitted must be your own.`,
            `Misrepresenting anyone else's work as your own will result in severe consequences`,
            `Don't cheat`,
            `Students must represent their data, analysis, sources, design work, code, testing, and individual contributions honestly.`,
            `Standard syllabus wording`
          ]
        },
        {
          title: 'Penalties & Enforcement',
          icon: 'gavel',
          summary: 'Consequences range from zeros on work to failing the course.',
          comments: [
            `My syllabus language on academic integrity is university standard. As for my personal policy, I catch them. I let them know they're caught. I compel them do the work honestly.`,
            `I usually fail the student for the entire semester and make them take the class again`,
            `give zero on project or exam.`,
            `between a zero for an assignment up to automatic failure of the class`,
            `I simply forward any observed/suspected dishonesty to the professor, and he will take care of the situation from there on.`
          ]
        },
        {
          title: 'Restorative & Culture-Building Approaches',
          icon: 'handshake',
          summary: 'Redo opportunities and building integrity through classroom culture.',
          comments: [
            `Students are provided with the opportunity to redo the work and demonstrate their mastery.`,
            `I don't have one. I feel like writing words which they won't read or remember is meaningless. I need to create the atmosphere of integrity through my own conduct, through the environment created in the class, through making assignments and tests feel relatable for the students, through choosing tasks more wisely (to reduce cheating), and through also finding interesting rubrics/etc which can help properly evaluate students.`
          ]
        },
        {
          title: 'AI-Specific Rules',
          icon: 'smart_toy',
          summary: 'Default prohibitions, explicit permissions and level-based guidance.',
          comments: [
            `No AI unless explicitly allowed in the assignment`,
            `AI tool usage is prohibited by default unless specified otherwise.`,
            `I encourage use of AI in certain parts of certain courses, in order to fill in the gaps with more advanced techniques and practices. I discourage use of AI in lower classes (like 200 level), telling students to only use AI to check the work they have completed, or to learn more about the topic.`
          ]
        }
      ]
    },

    /* ---------- Value of assessments ---------- */
    assessments: {
      themes: [
        {
          title: 'Purpose & Accuracy of Assessment',
          icon: 'track_changes',
          summary: 'Assessments should accurately reveal knowledge and certify mastery.',
          comments: [
            `Assessments, by their nature, should give insight into the knowledge possessed by the student. They should also help shape instruction and course objectives. The form of the assessment isn't as important as the accuracy of the information it relays to the instructor.`,
            `I believe the purpose of an assessment should influence how it is designed and administered. For example, an end-of-semester assessment that contributes to a student's final grade should accurately reflect the student's mastery of the material. Academic dishonesty in this context is a serious concern because it undermines the integrity of the assessment, potentially misrepresents the student's abilities, and can ultimately affect both the student and the institution's reputation.\n\nOn the other hand, I see mid-semester assessments that are intended primarily as learning opportunities somewhat differently. If an assessment does not contribute to a student's grade, its primary purpose may be to help the student identify areas of weakness and improve before a higher-stakes examination. In that context, I am less concerned about how a student performs and more concerned about whether the student is genuinely learning from the experience. Of course, academic dishonesty is never ethical, but I think there is an important distinction between an assessment intended to certify mastery and one intended to promote learning.\n\nUltimately, I believe assessments should be student-centered while maintaining academic integrity. Students should have opportunities to make mistakes, recognize weaknesses, and improve their understanding without necessarily being penalized. At the same time, when we certify that students have mastered particular knowledge or skills, those assessments must be meaningful and trustworthy. This protects the student, the institution, and those who will eventually rely on the student's demonstrated competence.`,
            `I am having difficulty with the yes/no questions because the definition of "academic integrity" is not clarified. It can mean many different things and at many different levels.`
          ]
        },
        {
          title: 'Formative vs. Summative',
          icon: 'swap_horiz',
          summary: 'Different assessment types measure growth, process or mastery.',
          comments: [
            `Assessments can be formative or summative. Formative assessments definitely do not look for mastery, but at process, growth, iteration,... Even summative assessments are not always expecting mastery. I guess you would have to clarify learning outcomes as competencies to define "mastery"`,
            `Formative assessments should test lower-level Bloom's taxonomy levels: identify, describe. Form may be low-stakes quizzes. Summative assessments should be more involved for the student and should be weighted higher in the final grade`
          ]
        },
        {
          title: 'Process-Based & Staged Work',
          icon: 'timeline',
          summary: 'Tracking work in progress makes learning visible and harder to fake.',
          comments: [
            `Assignments should be assessed.`,
            `I personally have the students work in stages and record the stages in a process book in order to see the progress. It is difficult to fake this kind of work because using a tool like AI doesn't give intermediate results like those one would see in a project done in stages.`,
            `For creative disciplines, seeing WIP is essential`
          ]
        },
        {
          title: 'Impact of Generative AI',
          icon: 'smart_toy',
          summary: 'AI challenges artifact-based and unproctored assessment.',
          comments: [
            `A lot of assessments have been taken over by genAI. I can see students have used it to write lengthy solutions but feel helpless in helping them`,
            `This is a very tricky question. I personally believe that current assessment format is lagging behind the need of industry, given the rapid development of AI related technologies. I think assessing what students have learnt is quite outdated; rather, assessing how students apply what they have learnt should be the new standard. Creative thinking and adaptation should be more encouraged in place of "doing the right thing".`,
            `In today's AI age I strongly feel that online or take-home exams are no longer viable. Homework retains its role as a skill builder, but final assessments that are not proctored have no value in determining a student's knowledge/skill.`,
            `In an age of effortless assessment artifacts due to AI, assessments cannot be oriented around artifacts.`
          ]
        },
        {
          title: 'Variety & Course Context',
          icon: 'dashboard_customize',
          summary: 'Varied, career-relevant formats tailored to each course.',
          comments: [
            `Very dependent on the course - some benefit more from projects, some require exams.`,
            `Students should be assessed based on what might lead to success in real careers.`,
            `Assessments should be varied to accommodate different student needs, and should be coordinated so that the assessment is transparent and really reveals student ability and understanding.`,
            `Multiple forms of assessment are good to cater to the different relative strengths students may possess. Multiple choice questions, free response questions, diagramming etc.`,
            `Depends on the course. My preference is hands on but not all courses can easily assess objectives that way.`
          ]
        }
      ]
    },

    /* ---------- Ideal assessment reflecting mastery ---------- */
    ideal: {
      themes: [
        {
          title: 'Verifying Authentic Work',
          icon: 'policy',
          summary: 'Unobserved work and AI make authenticity hard to confirm.',
          comments: [
            `That would be my nightmare as a professor. But it hadn't occurred to me until you asked the question. In work that is not observed, it is impossible to know the degree of help a student has received.`,
            `Students may make lucky guesses on quizzes and exams. Students may not contribute equally on group projects. With rampant use of AI, sometimes it is difficult to assess work authenticity - did the student create the solution or simply use AI or some other means?`,
            `I could be wrong, but it usually seems clear if a student doesn't grasp the concepts taught in class.`
          ]
        },
        {
          title: 'Demonstration & Defense',
          icon: 'record_voice_over',
          summary: 'Students solve problems and defend their decisions before a panel.',
          comments: [
            `You ask a student to solve a problem, and their ability to solve the problem and defend all their decisions along the way is evaluated by a panel.`,
            `The course in my example was a Capstone level course. In it, we're measuring a student's final abilities and not growth. In this way, it is an exception compared to other courses. But, due to this, the above questions don't apply much.`
          ]
        },
        {
          title: 'Iterative, Formative & Peer Feedback',
          icon: 'loop',
          summary: 'Aligning process, artifacts and outcomes over time builds confidence.',
          comments: [
            `We mostly do formative feedback throughout the semester to assess growth and it is iterative. We also have students give peer feedback throughout the semester to build critical thinking skills.`,
            `This kind of assessment is always inexact but by careful alignment of process, artifacts, and learning objectives, an instructor can have reasonable confidence of learning progress.`,
            `Having multiple assignments and papers allows you to see a students tone. It is very observe when that style and tone changes even without AI likeliness scores.`
          ]
        },
        {
          title: 'Measurement & Survey Design Concerns',
          icon: 'rule',
          summary: 'Questions about defining "effective" and measuring growth objectively.',
          comments: [
            `I feel that this survey is difficult to fill out for someone who does not use "tests or exams" to assess student competency and growth.`,
            `Again, I am not sure what I should pick for the matrix of measuring effectiveness. It sounds too vague and subjective (what does "effective" mean in this case?). To be strictly honest, what us TA can do is to grade students work as fairly as possible (especially in project-based classes). Since "growth" as a concept is way too subjective to be taken into account when grading (is there really a measuring matrix for growth?), Us TA could not simply respond to a student's question of his/her grade by saying "oh, your growth is not as good as the others". Therefore us TA could only rely on "whether or not the student demonstrates he/she has learnt the taught technique" (objective evaluation), not on "how the student applies the learnt technique" (subjective evaluation).`
          ]
        }
      ]
    }
  }
};
