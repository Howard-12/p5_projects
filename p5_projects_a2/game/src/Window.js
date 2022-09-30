class Window
{
  constructor ()
  {
    this.scenes = [];
  }

  // onAttach(scene, ...arg)
  onAttach(attachedS)
  {
    if (!this.scenes.includes(attachedS, 0))
      this.scenes.push(attachedS);
  }

  onDetach(detachS)
  {
    this.scenes.splice(this.scenes.indexOf(detachS), 1);
  }

  update()
  {
    for (let s=0; s<this.scenes.length; ++s) this.scenes[s].update();
  }

  draw()
  {
    for (let s=0; s<this.scenes.length; ++s) this.scenes[s].draw();
  }
}
