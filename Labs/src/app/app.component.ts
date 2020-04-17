import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PusherService } from './pusher.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private pusher: PusherService, private http: HttpClient) {}

  event = 'vote';
  vote = '';
  voted = false;
  playerData = [
    {
      name: 'M S Dhoni',
      Runs: 4432,
      Wickets: 0,
      Catches: 98,
      shortName: 'Dhoni',
      image:
        'https://smedia2.intoday.in/aajtak/images/Photo_gallery/092019/w43243_030420010835_030920012325.jpg',
    },
    {
      name: 'Virat Kohli',
      Runs: 5412 ,
      Wickets: 5,
      Catches: 13,
      shortName: 'Cheeku',
      image:
        'https://imagevars.gulfnews.com/2019/04/29/Virat-Kohli-gestures_16a6847fc38_large.jpg',
    },
    {
      name: 'David Warner',
      Runs: 4706,
      Wickets: 0,
      Catches: 54,
      shortName: 'Warn',
      image:
        'https://engcric.b-cdn.net/wp-content/uploads/2019/04/GAZI_1576.jpg',
    },
    {
      name: 'Ravindra Jadeja',
      Runs: 1927,
      Wickets: 108,
      Catches: 63,
      shortName: 'Jaddu',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRwkILg1kuFbycP5dlDc1wZIic1Rd2PiAIq3QxLKMD1yBNjwyTi&usqp=CAU',
    },
    {
      name: "Jasprit Bumrah",
      Runs: 35,
      Wickets: 122,
      Catches: 82,
      shortName: 'Boom',
      image:
        'https://pbs.twimg.com/media/DboJJsQU0AEmRz3.jpg',
    },
  ];
  voteCount = {
    Dhoni: 0,
    Cheeku: 0,
    Warn: 0,
    Jaddu: 0,
    Boom: 0,
  };

  chartLabels: string[] = Object.keys(this.voteCount);
  chartData: number[] = Object.values(this.voteCount);
  chartType = 'pie';

  castVote(player) {
    this.http
      .post('http://localhost:4000/vote', { player })
      .subscribe((res: any) => {
        this.vote = res.player;
        this.voted = true;
      });
  }

  getVoteClasses(player) {
    return {
      elect: this.voted && this.vote === player,
      lost: this.voted && this.vote !== player,
    };
  }

  ngOnInit() {
    const channel = this.pusher.init();
    channel.bind('vote', ({ player }) => {
      this.voteCount[player] += 1;
      this.chartData = Object.values(this.voteCount);
    });
  }
}
