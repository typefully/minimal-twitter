import * as Slider from "@radix-ui/react-slider";

const MinimalSlider = () => (
  <Slider.Root>
    <Slider.Track>
      <Slider.Range />
    </Slider.Track>
    <Slider.Thumb />
  </Slider.Root>
);

export default MinimalSlider;
