var monster_colors = "072ac8-1e96fc-a2d6f9-fcf300-ffc600".split("-").map(a => "#" + a)

class Monster {
  constructor(args) {
    this.r = args.r || random(50, 100)
    this.p = args.p || createVector(random(width), random(height))
    this.v = args.v || createVector(random(-1, 1), random(-1, 1)).limit(10)
    this.color = args.color || random(monster_colors)
    this.deed = false
    this.timenum = 0
  }

  draw() {
    if (this.deed == false) {
      push()
      translate(this.p.x, this.p.y)
      fill(this.color)
      noStroke()

      // Body
      ellipse(0, 0, this.r)

      // Eyes
      fill(255)
      ellipse(-this.r / 4, -this.r / 8, this.r / 6)
      ellipse(this.r / 4, -this.r / 8, this.r / 6)

      // Mouth
      fill(0)
      arc(0, this.r / 6, this.r / 2, this.r / 3, 0, PI)

      pop()
    } else {
      this.timenum = this.timenum + 1
      push()
      translate(this.p.x, this.p.y)
      fill(this.color)
      noStroke()
      ellipse(0, 0, this.r)
      stroke(255)
      line(-this.r / 2, 0, this.r / 2, 0)
      stroke(this.color)
      strokeWeight(4)
      noFill()
      for (var j = 0; j < 8; j++) {
        rotate(PI / 4)
        line(this.r / 2, 0, this.r, 0)
      }
      pop()
    }
  }

  update() {
    this.p.add(this.v)

    if (this.p.x <= 0 || this.p.x >= width) {
      this.v.x = -this.v.x
    }
    if (this.p.y <= 0 || this.p.y >= height) {
      this.v.y = -this.v.y
    }
  }

  isBallInRanger(x, y) {
    let d = dist(x, y, this.p.x, this.p.y)
    if (d < this.r / 2) {
      return true
    } else {
      return false
    }
  }
}
