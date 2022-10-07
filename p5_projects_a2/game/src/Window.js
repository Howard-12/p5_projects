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

  deAttach(attachedS)
  {
    for (let scene of this.scenes)
      for (let button of scene.elements)
        button.hide();
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
