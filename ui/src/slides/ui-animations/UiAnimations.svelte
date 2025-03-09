<script>
  import Slide from 'src/slides/ui-animations/Slide.svelte'
  import ExampleClarity from 'src/slides/ui-animations/ExampleClarity.svelte'
  import ExampleUserAttention from 'src/slides/ui-animations/ExampleUserAttention.svelte'

</script>

<div class="grid grid-cols-2 p-10 gap-10">
  <Slide title="Meaningful animations">
    <p>Meaningful animations play a crucial role in UX by enhancing usability, guiding user interactions, and improving
      the overall experience. </p>
  </Slide>

  <Slide title="Improve Clarity">
    <p>
      Animations help users <strong>understand changes</strong> in the interface, making complex applications feel more intuitive.
    </p>
    <div slot="example">
      <ExampleClarity />
    </div>
  </Slide>

  <Slide title="Cognitive load">
    <p>Cognitive load refers to the mental effort required for users to process and interact with an interface.</p>
    <p>High cognitive load can lead to confusion, errors, and frustration, especially in complex back-office
      applications.</p>


    <div slot="example">
      <p>Types of Cognitive Load in UX:</p>
      <ul>
        <li><strong>Intrinsic Load</strong> – The inherent complexity of the task (e.g., filling out a complex financial
          form).
        </li>
        <li><strong>Extraneous Load</strong> – Unnecessary complexity added by the interface (e.g., unclear navigation,
          excessive
          animations).
        </li>
        <li><strong>Germane Load</strong> – The mental effort that helps users learn and use the system efficiently
          (e.g.,
          well-designed
          animations guiding attention).
        </li>
      </ul>
    </div>
  </Slide>

  <Slide topic="Reduce Cognitive Load" title="Guide User Focus">
    <p>Animations direct attention to important elements, helping users quickly understand changes.</p>
    <div slot="example">
      Financial table, updated cell background color blinks
      Tree navigation, expanding and collapsing
    </div>
  </Slide>
  <Slide topic="Reduce Cognitive Load" title="Improve Navigation Clarity">
    <p>Provide Instant Feedback – Visual cues reassure users that their actions have been registered</p>

    <div slot="example">
      (e.g., subtle button animations confirming a submission)
    </div>
  </Slide>
  <Slide topic="Reduce Cognitive Load" title="Make Data More Digestible">
    <p>Motion can be used to progressively reveal information, reducing overwhelm</p>
    <div slot="example">
      (e.g., step-by-step animations in revealing complex reports) ??
    </div>
  </Slide>

  <Slide title="Provide Feedback & Acknowledge User Actions">
    Helps users feel in control by confirming interactions.

    <div slot="example">
      A button subtly changes when clicked, providing instant feedback that an action was registered.
    </div>
  </Slide>

  <Slide title="Enhance Navigation & Spatial Awareness">
    <p>Smooth transitions between states prevent users from feeling lost.</p>

    <div slot="example">
      In financial applications, animations can indicate when a filter is applied or a dataset is refreshed.
      Page transitions, expanding cards
      Moving things into shopping cart
      Code: CSS page transitions example. ON/OFF toggle
      Show code: how to use page transitions, maybe some other examples for navigation changing in the meantime
    </div>
  </Slide>

  <Slide title="Guide User Attention">
    <p>Animations direct focus to important elements, reducing errors and improving efficiency.</p>
    <div slot="example">
      <ExampleUserAttention />
    </div>
  </Slide>


  <Slide title="Indicate System Status & Load Times">
    <p>Users are more patient when they see progress.</p>
    <div slot="example">
      * Example: Skeleton loaders on a dashboard reduce perceived waiting time for data retrieval.
      * Indeterminate progress bars
      Code: a dashboard loading with skeletons.
    </div>
  </Slide>


  <Slide title="Increase Engagement Without Being Distracting">
    <ul>
      <li>Subtle, well-timed animations improve experience without overwhelming the user</li>
      <li>What is the most important thing that needs to draw attention at that very moment? Signal colors vs
        animations
      </li>
    </ul>
    <div slot="example">
      Example: A military defense system UI might use animations to highlight critical alerts without unnecessary
      motion.
      Code: Map implementation with many markers, one is important. Pulse animation for drawing attention on something
      on a map
      Code: Map implementation with a marker.
    </div>
  </Slide>

  <Slide title="Improve Accessibility & Usability">
    <p>
      Animations can make interfaces feel smoother, but they should also respect user preferences (e.g.,
      prefers-reduced-motion).
    </p>
    <div slot="example">
      Example: In enterprise applications, animations should not be too fast or slow—finding the right balance ensures
      usability for all users.
    </div>
  </Slide>

  <Slide title="So... why bother?">
    <p>How can all this be valuable for our clients and our business? </p>

    <div slot="example">
      <ul>
        <li>Less friction for users using the application.</li>
        <li>Clients employees get their work done faster.</li>
        <li>Clients customers are more satisfied with the service.</li>
        <li>Clients customers have higher conversion rates.</li>
        <li>Clients customers are more likely to return.</li>
        <li>Clients customers are more likely to recommend the service to others.</li>
      </ul>
    </div>

  </Slide>

</div>
