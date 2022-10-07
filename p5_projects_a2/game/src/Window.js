class Window
{
  constructor ()
  {
    this.scenes = [];
  }

  onAttach(attachedS)
  {
    if (!this.scenes.includes(attachedS, 0))
    {
      this.scenes.push(attachedS);
      for (let button of attachedS.elements)
        button.show();
    }
  }

  DeAttach(attachedS)
  {
    this.scenes = [];
    if (!this.scenes.includes(attachedS, 0))
    {
      this.scenes.push(attachedS);
      for (let button of attachedS.elements)
        button.show();
    }
  }

  onDetach(detachS)
  {
    for (let button of detachS.elements)
      button.hide();
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
