# OBJECTIVE: Use global commands, block visual, and macros to batch-edit Terraform
#
# Tasks:
#   1. Add `tags = { managed = "true" }` above every closing `}` of a resource block
#      using a macro: qa → O  tags... → <Esc> → /^}<CR> → q → repeat with @a
#   2. Replace all `t3.micro` with `t3.small` using :%s/t3.micro/t3.small/g
#   3. Add a `description` field to each variable block (use block visual + macro)
#   4. Change all `us-east-1` to `eu-west-1` using :%s
#   5. Delete all comment-only lines using :g/^\s*#/d (be careful: don't run on THIS block!)
#
# TIMING: Expert 90s | Proficient 180s | Learning 300s

variable "environment" {
  type    = string
  default = "production"
}

variable "region" {
  type    = string
  default = "us-east-1"
}

variable "instance_count" {
  type    = number
  default = 3
}

resource "aws_instance" "web" {
  ami           = "ami-0c55b159cbfafe1f0"
  instance_type = "t3.micro"
  count         = var.instance_count

  root_block_device {
    volume_size = 20
    volume_type = "gp3"
  }
}

resource "aws_instance" "api" {
  ami           = "ami-0c55b159cbfafe1f0"
  instance_type = "t3.micro"
  count         = var.instance_count

  root_block_device {
    volume_size = 40
    volume_type = "gp3"
  }
}

resource "aws_instance" "worker" {
  ami           = "ami-0c55b159cbfafe1f0"
  instance_type = "t3.micro"
  count         = var.instance_count * 2

  root_block_device {
    volume_size = 80
    volume_type = "gp3"
  }
}

resource "aws_security_group" "web" {
  name        = "web-sg"
  description = "Security group for web servers"
  vpc_id      = var.vpc_id

  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_lb" "main" {
  name               = "${var.environment}-lb"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.web.id]
  subnets            = var.subnet_ids
}

# EXPECTED after tasks:
# 1. Each resource block has tags = { managed = "true" } before closing }
# 2. All t3.micro → t3.small
# 3. Each variable has description = "..." field
# 4. All us-east-1 → eu-west-1
# 5. Comment lines removed (except this block if you were careful with ranges)
