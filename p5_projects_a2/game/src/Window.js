class Window
{
  constructor ()
  {
    // this.info;
    // this.scene1 = scene1;
    // this.scene2 = scene2;
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
    // print(this.scenes.length);
    for (let s=0; s<this.scenes.length; ++s) this.scenes[s].draw();
  }
}
