import 'package:flutter/material.dart';
import 'package:portfoliotracker/shared/colors.dart' as colorPallete;

class StatCard extends StatefulWidget {
  StatCard({Key key, this.title, this.content, this.contentColor})
      : super(key: key);

  final String title;
  final String content;
  final Color contentColor;

  @override
  _StatCardState createState() => _StatCardState(title, content, contentColor);
}

class _StatCardState extends State<StatCard> {
  String title;
  String content;
  Color contentColor;

  _StatCardState(this.title, this.content, this.contentColor);
  @override
  Widget build(BuildContext context) {
    return Container(
      margin: EdgeInsets.all(10),
      padding: EdgeInsets.all(15),
      width: 200,
      height: MediaQuery.of(context).size.height / 9,
      child: Column(
        mainAxisAlignment: MainAxisAlignment.start,
        children: [
          Text(
            '${this.title}',
            style: TextStyle(
                color: colorPallete.Colors.mainDark,
                fontWeight: FontWeight.bold,
                fontSize: 16),
          ),
          Spacer(),
          Text(
            '${this.content}',
            style: TextStyle(
                color: this.contentColor,
                fontWeight: FontWeight.bold,
                fontSize: 26),
          ),
          Spacer(),
        ],
      ),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(10),
        color: colorPallete.Colors.blueCream,
      ),
    );
  }
}
